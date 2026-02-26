// src/pages/dashboard/products.tsx
import { useProductsList } from '@/hooks/api/useDashboardApi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductsPage() {
  const { data: products = [], isPending, isError } = useProductsList()

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isError || !products) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load products</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.sales.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={product.category === 'subscription' ? 'default' : 'secondary'}>
                    {product.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {products.length === 0 && (
          <p className="text-center py-10 text-muted-foreground">
            No products found
          </p>
        )}
      </CardContent>
    </Card>
  )
}