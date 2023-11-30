import { useRef } from 'react'
import { useEffect } from 'react'

import Halo from 'web/public/Halo.jpeg'

import {
  Form,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.landing())
    }
  }, [isAuthenticated])

  const emailRef = useRef(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main
        style={{
          backgroundImage: `url(${Halo})`,
        }}
        className="flex h-screen max-h-[calc(100vh-38px)] w-full flex-col items-center justify-center bg-cover"
      >
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="w-1/2 items-center justify-center rounded-xl bg-Blue py-4 opacity-75">
          <div className="flex flex-col gap-4 rounded-t-xl bg-Blue">
            <header className="w-full rounded-t-xl border-b border-LightBlue">
              <h2 className="text-center text-3xl text-LightBlue">Login</h2>
            </header>
            <Form onSubmit={onSubmit} className="flex flex-col gap-4 bg-Blue">
              <div className="m-4 flex flex-col gap-4">
                <TextField
                  name="email"
                  className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                  errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                  placeholder="example@email.com"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />

                <FieldError name="email" className="rw-field-error" />

                <div>
                  <PasswordField
                    name="password"
                    className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
                    errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                    placeholder="Enter your password . . ."
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="text-sm text-LightBlue hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <FieldError name="password" className="rw-field-error" />
              </div>

              <div className="flex flex-col gap-2 border-t border-LightBlue p-4">
                <div className="flex flex-row items-center justify-center gap-4">
                  <Link
                    to={routes.landing()}
                    className="rounded-lg border border-LightBlue px-3 py-1 text-lg text-LightBlue"
                  >
                    Cancel
                  </Link>
                  <Submit className="rounded-lg border border-LightBlue px-3 py-1 text-lg text-LightBlue">
                    Login
                  </Submit>
                </div>
                <div className="text-center text-base text-LightBlue">
                  <span>Don&apos;t have an account?</span>{' '}
                  <Link to={routes.signup()} className="rw-link">
                    Sign up!
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

export default LoginPage
