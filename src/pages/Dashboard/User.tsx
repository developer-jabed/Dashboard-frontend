// src/pages/dashboard/users.tsx
import { useMemo, useState } from 'react'
import { useUsersList } from '@/hooks/api/useDashboardApi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'

export default function UserPage() {
  const { data: users = [], isPending, isError } = useUsersList()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const filteredUsers = useMemo(() => {
    let filtered = [...users]

    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter((u) => u.status === status)
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [users, search, status, sortBy])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load users</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border bg-background">
        <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Users Overview
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This is static demo data. API pagination & backend filtering will be implemented later.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              className="pl-9 h-10 bg-muted/40 border-muted focus-visible:ring-1 focus-visible:ring-primary"
              placeholder="Search user..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-4">
          <Select value={status} onValueChange={(val) => { setStatus(val); setCurrentPage(1) }}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val) => { setSortBy(val); setCurrentPage(1) }}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/40 transition">
                  <TableCell className="font-semibold text-primary">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={user.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <p className="text-center py-10 text-muted-foreground">No users found</p>
          )}
        </CardContent>

        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 border-t py-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Rows per page:</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => {
                setItemsPerPage(Number(val))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}