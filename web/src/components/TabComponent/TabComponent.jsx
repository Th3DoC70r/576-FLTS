import React, { useState } from 'react'

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'

import { useAuth } from 'src/auth'

const TabComponent = ({ data, active }) => {
  const { currentUser } = useAuth()

  const [activeTab, setActiveTab] = useState(active)

  const hasRole = (exclusiveRoles) => {
    const userRoles = currentUser?.roles || []
    return (
      exclusiveRoles.length === 0 ||
      userRoles.length === 0 ||
      exclusiveRoles.some((role) => userRoles.includes(role))
    )
  }

  return (
    <Tabs
      value={activeTab}
      className="flex w-full flex-col justify-center self-stretch"
    >
      <TabsHeader
        className={`flex w-full gap-2 self-stretch rounded-none border-b bg-transparent p-0`}
        indicatorProps={{
          className: 'bg-transparent shadow-none rounded-lg rounded-b-none',
        }}
      >
        {data.map(
          ({ label, icon, iconPosition = 'right', value, exclusive = [] }) =>
            hasRole(exclusive) && (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 transition hover:underline ${
                  activeTab === value
                    ? 'bg-TetherLightGreen text-black transition'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex flex-row items-center gap-2 p-1">
                  {iconPosition === 'left' && icon}
                  <span className="hidden lg:inline-block">{label}</span>
                  {iconPosition === 'right' && icon}
                </div>
              </Tab>
            )
        )}
      </TabsHeader>
      <TabsBody>
        {data.length === 0 ? (
          <div>You have no data saved to your profile.</div>
        ) : (
          data.map(({ value, content, exclusive = [] }) =>
            hasRole(exclusive) ? (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ) : null
          )
        )}
      </TabsBody>
    </Tabs>
  )
}

export default TabComponent
