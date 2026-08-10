import React from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { Heading, Text, Card, Badge } from '@astryxdesign/core';

const App: React.FC = () => {
  return (
    <Theme theme={neutralTheme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Nav */}
        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
          <Heading level={1} className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</Heading>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
          </div>
        </nav>
        <div className="flex">
          {/* Side Nav */}
          <aside className="w-48 bg-white dark:bg-gray-800 p-4 space-y-2">
            {['Overview', 'Analytics', 'Reports', 'Settings', 'Help'].map(item => (
              <div key={item} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { title: 'Total Revenue', value: '$124,500', change: 12.5, trend: 'up' },
                { title: 'Active Users', value: '8,432', change: 8.2, trend: 'up' },
                { title: 'Conversion Rate', value: '3.2%', change: -1.5, trend: 'down' },
                { title: 'Avg Order Value', value: '$67.80', change: 0, trend: 'neutral' },
              ].map(stat => (
                <Card key={stat.title} className="p-4 shadow-md">
                  <Heading level={3} className="text-gray-500 mb-2">{stat.title}</Heading>
                  <Text className="font-bold text-primary text-xl">{stat.value}</Text>
                  <div className="flex items-center mt-2">
                    <Badge label={`${stat.trend === 'up' ? '▲' : stat.trend === 'down' ? '▼' : '—'} ${Math.abs(stat.change)}%`} variant={stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'error' : 'warning'}>
                    </Badge>
                    <Text className="text-xs text-gray-500 ml-2">vs last month</Text>
                  </div>
                </Card>
              ))}
            </div>
            {/* Data Table */}
            <Card className="p-6 shadow-lg">
              <Heading level={2} className="mb-4 border-b pb-2">Recent Transactions</Heading>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm uppercase tracking-wider text-gray-600">
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Sales</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, product: 'Quantum Processor X', sales: 45000, status: 'active', region: 'North' },
                    { id: 2, product: 'Nebula Sensor Array', sales: 12000, status: 'warning', region: 'South' },
                    { id: 3, product: 'Aether Chipset V2', sales: 89000, status: 'active', region: 'East' },
                    { id: 4, product: 'Flux Capacitor Kit', sales: 500, status: 'error', region: 'West' },
                    { id: 5, product: 'Hyperdrive Coil Mk III', sales: 72000, status: 'active', region: 'North' },
                    { id: 6, product: 'Graviton Stabilizer', sales: 31000, status: 'warning', region: 'South' },
                    { id: 7, product: 'Chronos Regulator', sales: 95000, status: 'active', region: 'East' },
                    { id: 8, product: 'Plasma Conduit Link', sales: 1500, status: 'error', region: 'West' },
                  ].map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.product}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">${item.sales.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} variant={item.status === 'active' ? 'success' : item.status === 'warning' ? 'warning' : 'error'}>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </main>
        </div>
      </div>
    </Theme>
  );
};

export default App;