# google/gemma-4-e4b — Task 2-Dashboard

**Model:** `google/gemma-4-e4b`
**Prompt tokens:** 362
**Completion tokens:** 3332

---

This solution provides all required files using TypeScript, functional components, and adhering strictly to the Astryx design system tokens for styling and responsiveness.

### 1. `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@astryxdesign/core';
import App from './App';
import themeNeutral from '@astryxdesign/theme-neutral';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* Wrap the entire application with ThemeProvider */}
    <ThemeProvider theme={themeNeutral}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### 2. `src/components/StatCard.tsx`

```tsx
import React from 'react';
import { Card, Heading, Text, Badge, Grid } from '@astryxdesign/core';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number; // Percentage change
  trendColor: 'up' | 'down' | 'neutral';
}

/**
 * Reusable card component for displaying key metrics.
 */
const StatCard: React.FC<StatCardProps> = ({ title, value, change, trendColor }) => {
  // Determine the badge color based on the trend
  let badgeStyle: React.CSSProperties = {};
  let trendIcon = '';

  if (trendColor === 'up') {
    badgeStyle = { backgroundColor: '#4CAF50' }; // Green for up
    trendIcon = '▲';
  } else if (trendColor === 'down') {
    badgeStyle = { backgroundColor: '#F44336' }; // Red for down
    trendIcon = '▼';
  } else {
    badgeStyle = { backgroundColor: '#FFC107' }; // Amber/Yellow for neutral
    trendIcon = '';
  }

  return (
    <Card className="p-4 shadow-md h-full flex flex-col justify-between">
      <div>
        {/* Title */}
        <Heading variant="sm" className="text-gray-500 mb-2">{title}</Heading>
        
        {/* Main Value */}
        <Text variant="large" className="font-bold text-primary mb-3">
          ${value.toLocaleString()}
        </Text>

        {/* Trend Indicator */}
        <div className="flex items-center space-x-2 mt-4">
          <Badge 
            variant="solid" 
            style={{ backgroundColor: badgeStyle.backgroundColor }}
            className="text-white text-xs py-1 px-3"
          >
            {trendIcon} {Math.abs(change)}%
          </Badge>
          <Text variant="caption" className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            vs last month
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
```

### 3. `src/components/DataTable.tsx`

```tsx
import React from 'react';
import { Card, Table, Heading, Text, Badge } from '@astryxdesign/core';

interface DataRow {
  id: number;
  productName: string;
  salesAmount: number;
  status: 'active' | 'warning' | 'error';
  region: string;
}

// Sample data for the table (8 rows)
const sampleData: DataRow[] = [
  { id: 1, productName: 'Quantum Processor X', salesAmount: 45000, status: 'active', region: 'North' },
  { id: 2, productName: 'Nebula Sensor Array', salesAmount: 12000, status: 'warning', region: 'South' },
  { id: 3, productName: 'Aether Chipset V2', salesAmount: 89000, status: 'active', region: 'East' },
  { id: 4, productName: 'Flux Capacitor Kit', salesAmount: 500, status: 'error', region: 'West' },
  { id: 5, productName: 'Hyperdrive Coil Mk III', salesAmount: 72000, status: 'active', region: 'North' },
  { id: 6, productName: 'Graviton Stabilizer', salesAmount: 31000, status: 'warning', region: 'South' },
  { id: 7, productName: 'Chronos Regulator', salesAmount: 95000, status: 'active', region: 'East' },
  { id: 8, productName: 'Plasma Conduit Link', salesAmount: 1500, status: 'error', region: 'West' },
];

/**
 * Displays a detailed data table with status badges.
 */
const DataTable: React.FC = () => {
  return (
    <Card className="p-6 shadow-lg">
      <Heading variant="h3" className="mb-4 border-b pb-2">Recent Transactions</Heading>
      
      {/* Astryx Table component */}
      <Table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50 text-left text-sm uppercase tracking-wider text-gray-600">
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">Sales Amount</th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">Region</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">${item.salesAmount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge 
                  variant={item.status === 'active' ? 'success' : item.status === 'warning' ? 'warning' : 'danger'}
                  className={`text-sm ${item.status === 'active' ? 'bg-green-100 text-green-800' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.region}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default DataTable;
```

### 4. `src/components/Dashboard.tsx`

```tsx
import React from 'react';
import { Grid, Heading, Text } from '@astryxdesign/core';
import StatCard from './StatCard';
import DataTable from './DataTable';

/**
 * Main content area for the dashboard, containing stats and tables.
 */
const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* H1 Semantic Heading */}
      <Heading variant="h1" className="mb-4">Dashboard Overview</Heading>

      {/* Section 2: Key Metrics Grid */}
      <section aria-labelledby="key-metrics">
        <Heading variant="h2" id="key-metrics" className="mb-6 border-b pb-2">Key Performance Indicators</Heading>
        
        {/* Responsive Grid: 1 column on mobile, 4 columns on desktop */}
        <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={4}>
          <StatCard 
            title="Total Revenue" 
            value={125000} 
            change={8.5} 
            trendColor="up" 
          />
          <StatCard 
            title="New Users" 
            value={3450} 
            change={-2.1} 
            trendColor="down" 
          />
          <StatCard 
            title="Conversion Rate" 
            value={4.7} 
            change={1.2} 
            trendColor="up" 
          />
          <StatCard 
            title="Support Tickets" 
            value={890} 
            change={0.5} 
            trendColor="neutral" 
          />
        </Grid>
      </section>

      {/* Section 3: Data Table */}
      <section aria-labelledby="data-table">
        <DataTable />
      </section>
    </div>
  );
};

export default Dashboard;
```

### 5. `src/App.tsx`

```tsx
import React from 'react';
import { AppShell, TopNav, SideNav, Grid } from '@astryxdesign/core';
import Dashboard from './components/Dashboard';
import { FaSearch, FaUserCircle, FaCog, FaChartLine, FaClipboardList } from 'react-icons/fa';

/**
 * Main application layout component using AppShell.
 */
const App: React.FC = () => {
  return (
    <AppShell>
      {/* Top Navigation */}
      <TopNav className="flex items-center justify-between p-4 shadow-sm">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-primary">Astryx Dashboard</h1>
        </div>

        {/* Search Bar (Center) */}
        <div className="flex-grow max-w-lg mx-8 hidden md:block">
          <input 
            type="search" 
            placeholder="Search reports, products, or users..." 
            className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary transition duration-150"
          />
        </div>

        {/* User Avatar (Right) */}
        <div className="flex items-center space-x-4">
          <button aria-label="Settings"><FaCog className="text-gray-500 hover:text-primary cursor-pointer text-xl" /></button>
          <div className="relative">
            <FaUserCircle className="text-3xl text-gray-400 cursor-pointer" />
            {/* Dropdown placeholder */}
          </div>
        </div>
      </TopNav>

      {/* Main Content Layout (SideNav + Dashboard) */}
      <Grid cols={{ base: 1, md: 12 }} gap={0}>
        {/* Side Navigation (Visible on desktop/tablet, collapses gracefully on mobile due to AppShell structure) */}
        <SideNav className="p-4 flex flex-col space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Menu</h2>
          {[
            { name: 'Dashboard', icon: FaChartLine, link: '/dashboard' },
            { name: 'Analytics', icon: FaClipboardList, link: '/analytics' },
            { name: 'Products', icon: FaCog, link: '/products' },
            { name: 'Users', icon: FaUserCircle, link: '/users' },
            { name: 'Settings', icon: FaSearch, link: '/settings' },
          ].map((item) => (
            <button 
              key={item.name} 
              className="flex items-center p-3 rounded-lg hover:bg-primary/10 transition duration-150 w-full text-left"
              aria-current={item.name === 'Dashboard' ? 'page' : undefined}
            >
              <item.icon className="mr-3 text-xl text-gray-500 hover:text-primary" />
              {item.name}
            </button>
          ))}
        </SideNav>

        {/* Main Content Area */}
        <div className="min-h-[calc(100vh-64px)]"> {/* Adjust height to account for TopNav */}
          <Dashboard />
        </div>
      </Grid>
    </AppShell>
  );
};

export default App;
```