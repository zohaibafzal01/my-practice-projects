import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for sales
const mockSales = [
  {
    id: 1,
    leadName: "John Smith",
    agent: "Agent Johnson",
    state: "CA",
    product: "Life Insurance",
    saleValue: 2500,
    commission: 375,
    dateSold: "2024-01-15",
    status: "confirmed",
  },
  {
    id: 2,
    leadName: "Jane Doe",
    agent: "Agent Davis",
    state: "TX",
    product: "Auto Insurance",
    saleValue: 1200,
    commission: 180,
    dateSold: "2024-01-14",
    status: "confirmed",
  },
  {
    id: 3,
    leadName: "Bob Wilson",
    agent: "Agent Smith",
    state: "FL",
    product: "Home Insurance",
    saleValue: 3200,
    commission: 480,
    dateSold: "2024-01-13",
    status: "pending",
  },
  {
    id: 4,
    leadName: "Alice Brown",
    agent: "Agent Wilson",
    state: "NY",
    product: "Life Insurance",
    saleValue: 1800,
    commission: 270,
    dateSold: "2024-01-12",
    status: "confirmed",
  },
];

export function SalesReporting() {
  const [sales, setSales] = useState(mockSales);
  const [filterAgent, setFilterAgent] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [filterProduct, setFilterProduct] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const filteredSales = sales.filter((sale) => {
    const matchesAgent = filterAgent === "all" || sale.agent === filterAgent;
    const matchesState = filterState === "all" || sale.state === filterState;
    const matchesProduct =
      filterProduct === "all" || sale.product === filterProduct;

    let matchesDate = true;
    if (dateFrom) {
      matchesDate = matchesDate && new Date(sale.dateSold) >= dateFrom;
    }
    if (dateTo) {
      matchesDate = matchesDate && new Date(sale.dateSold) <= dateTo;
    }

    return matchesAgent && matchesState && matchesProduct && matchesDate;
  });

  const totalSaleValue = filteredSales.reduce(
    (sum, sale) => sum + sale.saleValue,
    0
  );
  const totalCommission = filteredSales.reduce(
    (sum, sale) => sum + sale.commission,
    0
  );
  const confirmedSales = filteredSales.filter(
    (sale) => sale.status === "confirmed"
  ).length;

  const handleExportCSV = () => {
    const csvData = [
      [
        "Lead Name",
        "Agent",
        "State",
        "Product",
        "Sale Value",
        "Commission",
        "Date Sold",
        "Status",
      ],
      ...filteredSales.map((sale) => [
        sale.leadName,
        sale.agent,
        sale.state,
        sale.product,
        sale.saleValue.toString(),
        sale.commission.toString(),
        sale.dateSold,
        sale.status,
      ]),
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-report.csv";
    a.click();
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      confirmed: "bg-green-500/20 text-green-400 border-green-400/50",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Sales Reporting
          </h2>
          <p className="text-secondary-text">
            Track and analyze all sales transactions
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          className="bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {filteredSales.length}
            </div>
            <div className="text-sm text-secondary-text">
              {confirmedSales} confirmed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">
              ${totalSaleValue.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-theme-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Total Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              ${totalCommission.toLocaleString()}
            </div>
            <div className="text-sm text-secondary-text">15% avg rate</div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Avg Sale Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              $
              {filteredSales.length > 0
                ? Math.round(
                    totalSaleValue / filteredSales.length
                  ).toLocaleString()
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={filterAgent} onValueChange={setFilterAgent}>
              <SelectTrigger className="bg-section-bg border-input-border text-primary-text">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Agent Johnson">Agent Johnson</SelectItem>
                <SelectItem value="Agent Davis">Agent Davis</SelectItem>
                <SelectItem value="Agent Smith">Agent Smith</SelectItem>
                <SelectItem value="Agent Wilson">Agent Wilson</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterState} onValueChange={setFilterState}>
              <SelectTrigger className="bg-section-bg border-input-border text-primary-text">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="bg-section-bg border-input-border text-primary-text">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Life Insurance">Life Insurance</SelectItem>
                <SelectItem value="Auto Insurance">Auto Insurance</SelectItem>
                <SelectItem value="Home Insurance">Home Insurance</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-section-bg border-input-border text-primary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-section-bg border-input-border text-primary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">
            Sales Transactions
          </CardTitle>
          <CardDescription className="text-secondary-text">
            Showing {filteredSales.length} of {sales.length} sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-input-border">
                  <TableHead className="text-cream-primary">
                    Lead Name
                  </TableHead>
                  <TableHead className="text-cream-primary">Agent</TableHead>
                  <TableHead className="text-cream-primary">State</TableHead>
                  <TableHead className="text-cream-primary">Product</TableHead>
                  <TableHead className="text-cream-primary">
                    Sale Value
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Commission
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Date Sold
                  </TableHead>
                  <TableHead className="text-cream-primary">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id} className="border-input-border">
                    <TableCell className="text-primary-text font-medium">
                      {sale.leadName}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {sale.agent}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {sale.state}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {sale.product}
                    </TableCell>
                    <TableCell className="text-theme-success font-medium">
                      ${sale.saleValue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-blue-400">
                      ${sale.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {sale.dateSold}
                    </TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
