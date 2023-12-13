import { useState } from 'react'

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react'

import { useAuth } from 'src/auth'

const AdminTabComponent = ({ data, active }) => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState(active)
  return (
    <Tabs
      value={activeTab}
      className="min-w-screen mx-1 mt-4 flex w-full flex-grow flex-col self-stretch"
    >
      <TabsHeader
        className={`flex w-full gap-2 self-stretch rounded-none border-b bg-transparent p-0`}
        indicatorProps={{
          className: 'bg-transparent shadow-none rounded-lg rounded-b-none',
        }}
      >
        {data.map(({ label, icon, iconPosition = 'right', value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 transition hover:underline ${
              activeTab === value
                ? 'bg-TetherLightGreen text-black transition'
                : 'bg-transparent text-gray-400 hover:text-black'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              {iconPosition === 'left' && icon}
              <span className="hidden lg:inline-block">{label}</span>
              {iconPosition === 'right' && icon}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.length === 0 ? (
          <div>You have no data saved to your profile.</div>
        ) : (
          data.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {content}
            </TabPanel>
          ))
        )}
      </TabsBody>
    </Tabs>
  )
}

export default AdminTabComponent
