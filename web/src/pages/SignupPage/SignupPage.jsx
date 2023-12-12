import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { Tooltip } from '@material-tailwind/react'
import { FaCheck } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import Fire from 'web/public/Fire.jpeg'

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(0)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [special, setSpecial] = useState(false)
  const [hide, setHide] = useState('hidden')
  const [reenter, setReenter] = useState('')
  const [matchPass, setMatchPass] = useState(false)
  const { isAuthenticated, signUp } = useAuth()

  const checkUppercase = /[A-Z]/
  const checkLowercase = /[a-z]/
  const checkSpecial = /[\p{P}\p{S}]/u

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.landing())
    }
  }, [isAuthenticated])

  useEffect(() => {
    setLength(password.length)
    setUppercase(checkUppercase.test(password))
    setLowercase(checkLowercase.test(password))
    setSpecial(checkSpecial.test(password))
  }, [password])

  useEffect(() => {
    if (reenter === password && reenter !== '') {
      setMatchPass(true)
    } else {
      setMatchPass(false)
    }
  }, [reenter])

  // focus on email box on page load
  const emailRef = useRef(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    if (matchPass && uppercase && special && length) {
      const response = await signUp({
        username: data.email,
        password: data.password,
        name: data.name,
        reason: data.reason,
      })

      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      } else {
        // user is signed in automatically
        toast.success('Welcome!')
      }
    } else {
      toast('You have not met the password requirements yet!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main
        style={{
          backgroundImage: `url(${Fire})`,
        }}
        className="flex h-screen max-h-[calc(100vh-38px)] w-full flex-col justify-center bg-cover p-4"
      >
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="w-2/5 items-center justify-center rounded-xl bg-Blue py-4 opacity-75">
          <div className="flex flex-col gap-4 rounded-t-xl bg-Blue">
            <header className="w-full rounded-t-xl border-b border-LightBlue">
              <h2 className="text-center text-3xl text-LightBlue">Register</h2>
            </header>
            <Form
              onSubmit={onSubmit}
              className="m-0 flex flex-col gap-4 bg-Blue"
            >
              <div className="flex flex-col gap-4 p-4">
                <TextField
                  name="email"
                  className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                  errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                  placeholder="Enter your email address . . ."
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />

                <FieldError name="email" className="rw-field-error" />

                <TextField
                  name="name"
                  className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                  errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                  placeholder="Enter your full name . . ."
                  validation={{
                    required: {
                      value: true,
                      message: 'Your name is required',
                    },
                  }}
                />

                <FieldError name="name" className="rw-field-error" />

                <Tooltip
                  content={
                    <div className="flex flex-col">
                      <p className="text-center underline">
                        Your password must:
                      </p>
                      <div className="flex flex-row items-center gap-1">
                        {length >= 8 ? (
                          <FaCheck size={18} color="Green" />
                        ) : (
                          <IoCloseSharp size={18} color="Red" />
                        )}

                        <p>Be 8 or more characters long</p>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        {uppercase ? (
                          <FaCheck size={18} color="Green" />
                        ) : (
                          <IoCloseSharp size={18} color="Red" />
                        )}
                        <p>Contain at least 1 uppercase character</p>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        {lowercase ? (
                          <FaCheck size={18} color="Green" />
                        ) : (
                          <IoCloseSharp size={18} color="Red" />
                        )}
                        <p>Contain at least 1 lowercase character</p>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        {special ? (
                          <FaCheck size={18} color="Green" />
                        ) : (
                          <IoCloseSharp size={18} color="Red" />
                        )}
                        <p>Contain at least 1 special character</p>
                      </div>
                    </div>
                  }
                  open={open}
                  className="bg-Yellow text-sm text-black"
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <PasswordField
                    name="password"
                    className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                    errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                    placeholder="Enter a password . . ."
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                    onFocus={() => setOpen(!open)}
                    onBlur={() => setOpen(!open)}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Tooltip>

                <FieldError name="password" className="rw-field-error" />

                <PasswordField
                  name="reEnterPassword"
                  className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                  errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                  placeholder="Re-enter the password . . ."
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password validation is required',
                    },
                  }}
                  onFocus={() => setHide('show')}
                  onBlur={() => setHide('hidden')}
                  onChange={(e) => setReenter(e.target.value)}
                />

                {matchPass ? (
                  <div className={`flex flex-row gap-1 ${hide}`}>
                    <FaCheck size={18} color="Green" />
                    <p className="text-base text-LightBlue">Passwords match!</p>
                  </div>
                ) : (
                  <div className={`flex flex-row gap-1 ${hide}`}>
                    <IoCloseSharp size={18} color="Red" />
                    <p className="text-base text-LightBlue">
                      Passwords do not match!
                    </p>
                  </div>
                )}

                <FieldError name="reEnterPassword" className="rw-field-error" />

                <Tooltip
                  content={
                    <div className="flex flex-col">
                      <p>
                        Ex: I&apos;m a member of the 576 FLTS / I&apos;m the
                        spouse of Amn Snuffy
                      </p>
                      <p>
                        Please allow for 3-5 days for your account to be
                        approved.
                      </p>
                    </div>
                  }
                  className="bg-Yellow text-sm text-black"
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <TextField
                    name="reason"
                    className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                    errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                    placeholder="Tell our administrator why you should be a member?"
                    validation={{
                      required: {
                        value: true,
                        message: 'A reason is required',
                      },
                    }}
                  />
                </Tooltip>
                <FieldError name="reason" className="rw-field-error" />
              </div>

              <div className="flex flex-col gap-2 border-t border-LightBlue p-4">
                <div className="flex flex-row items-center justify-center gap-4">
                  <Link
                    to={routes.landing()}
                    className="rounded-lg border border-LightBlue px-3 py-1 text-lg text-LightBlue focus:outline-LightBlue"
                  >
                    Cancel
                  </Link>
                  <Submit className="rounded-lg border border-LightBlue px-3 py-1 text-lg text-LightBlue focus:outline-LightBlue">
                    Signup
                  </Submit>
                </div>
                <div className="text-center text-base text-LightBlue">
                  <span>Don&apos;t have an account?</span>{' '}
                  <Link
                    to={routes.login()}
                    className="rw-link focus:outline-LightBlue"
                  >
                    Login!
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
