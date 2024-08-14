import React from 'react';
import {useParams } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { useGetReviewsQuery, useDeleteReviewMutation } from '../../slices/reviewsApiSlice';
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ReviewListScreen = () => {
  const { pageNumber } = useParams() || 1;

  const { data, isLoading, error, refetch } = useGetReviewsQuery({ pageNumber });


  const [deleteReview, { isLoading: loadingDelete }] = useDeleteReviewMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteReview(id);
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
          <h1>Reviews</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT</th>
                <th>USER</th>
                <th>RATING</th>
                <th>COMMENT</th>
                <th>DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.reviews.map((review, index) => (
                <tr key={review._id || index}>
                  <td>{review._id}</td>
                  <td>{review.productName || '-' }</td>
                  <td>{review.name}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>{review.createdAt}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(review._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ReviewListScreen;