import { apiSlice } from './apiSlice';
import { SUPPLIERS_URL } from '../constants';

export const suppliersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => ({
        url: SUPPLIERS_URL,
      }),
			keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getSupplierDetails: builder.query({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSupplier: builder.mutation({
      query: () => ({
        url: `${SUPPLIERS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Supplier'],
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/${data.supplierId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Suppliers'],
    }),
    deleteSupplier: builder.mutation({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
        method: 'DELETE',
      }),
      providesTags: ['Supplier'],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierDetailsQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApiSlice;