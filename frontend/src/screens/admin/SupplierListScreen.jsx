import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetSuppliersQuery,
  useDeleteSupplierMutation,
  useCreateSupplierMutation,
} from '../../slices/suppliersApiSlice';
import { toast } from 'react-toastify';

const SupplierListScreen = () => {
	const { data: suppliers, refetch, isLoading, error } = useGetSuppliersQuery();

  const [deleteSupplier, { isLoading: loadingDelete }] = useDeleteSupplierMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? It can effect other data')) {
      try {
        await deleteSupplier(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createSupplier, { isLoading: loadingCreate }] =
    useCreateSupplierMutation();

  const createSupplierHandler = async () => {
    if (window.confirm('Are you sure you want to create a new supplier?')) {
      try {
        await createSupplier();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Suppliers</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createSupplierHandler}>
            <FaPlus /> Create Supplier
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>START OF WORK</th>
              <th>COUNTRY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
							<td>{supplier._id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.dateOfStart}</td>
                  <td>{supplier.country}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/supplier/${supplier._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(supplier._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
        </Table>
      )}
    </>
  );
};

export default SupplierListScreen;
