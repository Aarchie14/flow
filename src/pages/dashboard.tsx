import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Home, Wallet, PiggyBank, List, CreditCard, Menu } from "lucide-react";
import darkfont from "@/assets/imgs/darkfont.webp";
import userimg from "@/assets/imgs/user.webp";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for Income vs Expenses chart
const data = [
  { month: "Jan", income: 3000, expenses: 2000 },
  { month: "Feb", income: 2500, expenses: 2200 },
  { month: "Mar", income: 7000, expenses: 5000 },
  { month: "Apr", income: 4000, expenses: 3500 },
  { month: "May", income: 4500, expenses: 4000 },
  { month: "Jun", income: 5000, expenses: 4500 },
];


const NavItem = ({ icon: Icon, label, active, isSidebarOpen }) => (
  <div
    className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active ? "text-indigo-900 font-medium" : "text-gray-400"
    } hover:text-indigo-900 hover:font-medium`}
  >
    {active && (
      <div className="absolute left-0 top-0 h-full w-1 bg-indigo-900 rounded-r-md" />
    )}
    <Icon
      size={24}
      className={`transition-all duration-200 ${
        active ? "text-indigo-900" : "text-gray-400"
      } group-hover:text-indigo-900`}
    />
    {isSidebarOpen && (
      <span className="transition-opacity duration-200 opacity-100 group-hover:opacity-100">
        {label}
      </span>
    )}
  </div>
);

const StatCard = ({ title, amount }) => (
  <Card className="p-4 bg-white shadow-lg rounded-2xl">
    <CardContent className="text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-black">{amount}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add actual logout logic here (e.g., clear auth token, redirect to login)
  };  

  return (
    <div className="flex h-screen bg-indigo-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 z-50 h-screen bg-white shadow-md p-4 transition-all duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-48 md:flex-shrink-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16">
          <img
            src={darkfont}
            alt="Logo"
            className="w-32 transition-all duration-300"
          />
          <button onClick={toggleSidebar} className="p-2 rounded-md md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 space-y-2">
          <NavItem
            icon={Home}
            label="Dashboard"
            active
            isSidebarOpen={true} // Always show labels in sidebar
          />
          <NavItem icon={Wallet} label="Income" isSidebarOpen={true} />
          <NavItem icon={CreditCard} label="Expenses" isSidebarOpen={true} />
          <NavItem icon={PiggyBank} label="Savings" isSidebarOpen={true} />
          <NavItem icon={List} label="Budgets" isSidebarOpen={true} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-30 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Menu toggle button - only visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-base sm:text-lg md:text-xl font-bold">
                Overview
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-base sm:text-lg md:text-xl font-bold text-black hover:underline">
                About Us
              </button>

              {/* Avatar with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <img
                      src={userimg}
                      alt="User"
                      className="h-full w-full object-cover rounded-full"
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-lg rounded-md"
                >
                  <DropdownMenuItem
                    onClick={() => console.log("View Profile Clicked")}
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()} // Prevents dropdown from closing
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Logout Confirmation Dialog */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will log you out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-indigo-100 hover:bg-indigo-300"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-indigo-100 hover:bg-indigo-300 text-black"
                  onClick={handleLogout}
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Stats Cards */}
          <div className="text-base sm:text-lg md:text-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Income" amount="₱100.00" />
            <StatCard title="Total Expenses" amount="₱100.00" />
            <StatCard title="Total Savings" amount="₱100.00" />
          </div>

          {/* Income vs Expenses Chart */}
          <Card className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white shadow-md rounded-xl w-full overflow-hidden">
            <CardContent className="h-full">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                Income vs Expenses
              </h2>
              <p className="ttext-base sm:text-lg md:text-xl text-gray-500 mb-4">
                Track your income and expenses over time with this interactive
                chart.
              </p>
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorExpenses"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#3b82f6"
                      fill="url(#colorIncome)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ef4444"
                      fill="url(#colorExpenses)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Dashboard;
