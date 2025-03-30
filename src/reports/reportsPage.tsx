import GradientBackgroundContainer from '@/components/GradientBackgroundContainer'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const reports = [
  'Intake Reporting',
  'Flow-Through',
  'Loss of Service',
  'Rent Supplement Request',
  'Goals and Progress',
  'Safety Plan',
  'Overdose Safety Plan',
  'Incident Report',
  'Individuals',
  'Shelter Diversion Follow-Up Log',
  'Site List'
]

export default function Reports() {
  const [search, setSearch] = useState('')
  const filteredReports = reports.filter((report) =>
    report.toLowerCase().includes(search.toLowerCase())
  )

  const navigate = useNavigate()

  const handleReportClick = (report: string) => {
    navigate(`/report/${report.replace(/\s+/g, '-').toLowerCase()}`)
  }

  return (
    <GradientBackgroundContainer className="bg-white w-full h-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Reports
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select a report to view details.
          </p>
          <Input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full max-w-md mx-auto"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredReports.map((report) => (
            <Card
              key={report}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleReportClick(report)}
            >
              <CardContent className="p-6 text-center">
                <CardTitle>{report}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </GradientBackgroundContainer>
  )
}
