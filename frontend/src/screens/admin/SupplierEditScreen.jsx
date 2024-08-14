import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetSupplierDetailsQuery,
  useUpdateSupplierMutation,
} from '../../slices/suppliersApiSlice';

const SupplierEditScreen = () => {
  const { id: supplierId } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfStart, setDateOfStart] = useState(0);
  const [country, setCountry] = useState('');

  const {
    data: supplier,
    isLoading,
    refetch,
    error,
  } = useGetSupplierDetailsQuery(supplierId);

  const [updateSupplier, { isLoading: loadingUpdate }] =
  useUpdateSupplierMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSupplier({
        supplierId,
				name,
        description,
				dateOfStart,
				country
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Supplier updated');
      refetch();
      navigate('/admin/supplierlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (supplier) {
			setName(supplier.name);
			setDescription(supplier.description);
			setDateOfStart(supplier.dateOfStart);
			setCountry(supplier.country);
    }
  }, [supplier]);


  return (
    <>
      <Link to='/admin/supplierlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Supplier</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

						<Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dateOfStart'>
              <Form.Label>Date of start cooperation</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter date of start cooperation'
                value={dateOfStart}
                onChange={(e) => setDateOfStart(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SupplierEditScreen;
