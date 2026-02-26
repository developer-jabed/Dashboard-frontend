import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../../utils/api/apiClient';
import { API_ENDPOINTS } from '../../constant/apiEndpoints';

export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;

}

export interface OverviewData {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;

}

export interface DashboardSummary {
  overview: OverviewData;
  recentUsers: User[];
  topProducts: Product[];
  // add more fields as needed
}


export function useUsersList(
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User[], Error>({
    queryKey: ['users', 'list'],
    queryFn: () => fetcher<User[]>(API_ENDPOINTS.USERS.LIST),
    ...options,
  });
}

export function useUserById(
  userId: number | string | null | undefined,
  options?: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  return useQuery<User, Error>({
    queryKey: ['users', 'detail', userId],
    queryFn: () => fetcher<User>(API_ENDPOINTS.USERS.BY_ID(userId!)),
    enabled: !!userId,
    ...options,
  });
}

export function useOverview(
  options?: Omit<UseQueryOptions<OverviewData, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<OverviewData, Error>({
    queryKey: ['overview'],
    queryFn: () => fetcher<OverviewData>(API_ENDPOINTS.OVERVIEW),
    ...options,
  });
}

export function useProductsList(
  options?: Omit<UseQueryOptions<Product[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Product[], Error>({
    queryKey: ['products', 'list'],
    queryFn: () => fetcher<Product[]>(API_ENDPOINTS.PRODUCTS.LIST),
    ...options,
  });
}

export function useDashboardAll(
  options?: Omit<UseQueryOptions<DashboardSummary, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DashboardSummary, Error>({
    queryKey: ['dashboard', 'all'],
    queryFn: () => fetcher<DashboardSummary>(API_ENDPOINTS.DASHBOARD.ALL),
    ...options,
  });
}


export function useInvalidateUsers() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };
}

export function useInvalidateDashboard() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    queryClient.invalidateQueries({ queryKey: ['overview'] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };
}