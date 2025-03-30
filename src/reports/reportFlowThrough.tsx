import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'

const flowThroughData = [
  // Mock data example
  {
    individual: 'John Doe',
    programOrSite: 'Program A',
    startDate: '2023-01-01',
    exitDate: '2023-02-01',
    exitReason: 'Graduated'
  },
  {
    individual: 'Jane Smith',
    programOrSite: 'Site B',
    startDate: '2023-03-01',
    exitDate: '2023-04-01',
    exitReason: 'Transferred'
  }
  // Add more mock data as needed
]

export default function FlowThroughReport() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterType, setFilterType] = useState<'dateRange' | 'startDateOnly' | 'totalResponses'>('dateRange')

  // Function to handle applying filters
  const handleFilter = async () => {
    // Here you could make a request to the backend with the selected filters
    console.log('Applying filter', { filterType, startDate, endDate })

    // Simulating a request to the database
    // Adjust this logic according to your backend implementation
    if (filterType === 'dateRange') {
      // Filter by Start Date and End Date
      console.log(`Filtering by dates: ${startDate} - ${endDate}`)
    } else if (filterType === 'startDateOnly') {
      // Filter by Start Date
      console.log(`Filtering by Start Date: ${startDate}`)
    } else if (filterType === 'totalResponses') {
      // Logic to show total responses
      console.log('Displaying total responses')
    }
  }

  return (
    <div className="bg-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Flow-Through Report</h2>

      <div className="mb-4">
        <div>
          {/* Buttons to select filter type */}
            <Button
                variant={filterType === 'dateRange' ? 'default' : 'outline'}
                onClick={() => setFilterType('dateRange')}
            >
                Start Date and End Date
            </Button>
            <Button
                variant={filterType === 'startDateOnly' ? 'default' : 'outline'}
                onClick={() => setFilterType('startDateOnly')}
            >
                Start Date
            </Button>
            <Button
                variant={filterType === 'totalResponses' ? 'default' : 'outline'}
                onClick={() => setFilterType('totalResponses')}
            >
                Total Responses
            </Button>
        </div>

        {/* Conditionally display input fields based on selected filter */}
        {filterType === 'dateRange' || filterType === 'startDateOnly' ? (
          <div className="mt-4">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mr-2"
              placeholder="Start Date"
            />
            {filterType === 'dateRange' && (
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mr-2"
                placeholder="End Date"
              />
            )}
            <Button onClick={handleFilter}>Apply Filter</Button>
          </div>
        ) : null}
      </div>

      {/* Table to display the report data */}
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableCell>Individual</TableCell>
            <TableCell>Program or Site</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Exit Date</TableCell>
            <TableCell>Exit Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flowThroughData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.individual}</TableCell>
              <TableCell>{row.programOrSite}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.exitDate}</TableCell>
              <TableCell>{row.exitReason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
