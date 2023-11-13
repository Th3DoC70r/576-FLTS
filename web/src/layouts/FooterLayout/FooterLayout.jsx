const FooterLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer className="flex flex-col border-t-4 border-LightBlue bg-Blue p-4">
        <p className="text-center text-3xl font-bold text-white">About Us</p>
        <p className="text-center text-xl font-semibold text-white">
          This site was coded by:
        </p>
        <p className="text-center text-lg font-medium text-white">
          SrA Elijah Snyder 576 FLTS
        </p>
        <p className="text-center text-lg font-medium text-white">and</p>
        <p className="text-center text-lg font-medium text-white">
          SSgt Alexander True 28 MXS
        </p>
      </footer>
    </>
  )
}

export default FooterLayout
