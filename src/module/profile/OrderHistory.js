import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../layout/Layout";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const OrderHistoryStyles = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 80px;
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  table,
  th,
  td {
    border: 1px solid #ddd;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .grid-item-details {
    margin-bottom: 10px;
    padding: 5px;
    background-color: #f1f1f1;
    border-radius: 5px;
  }
  .order-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 567px;
    font-size: 14px;
  }
  .order-address {
    word-wrap: break-word;
    max-width: 200px;
  }
  .order-status-pending {
    padding: 5px;
    background-color: #c92127;
    color: #f9f9f9;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    border-radius: 8px;
  }
  .order-status-shipping {
    padding: 5px;
    background-color: #20b238;
    color: #f9f9f9;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    border-radius: 8px;
  }
  .order-payment {
    max-width: 100px;
    word-wrap: break-word;
  }
  .order-id{
    font-weight: 600;
  }
`;

const OrderHistory = () => {
  const [data, setData] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const token = window.localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/order/history",
          config
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <OrderHistoryStyles>
        {data ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Address</th>
                <th>Payment Code</th>
                <th>Payment Date</th>
                <th>Total</th>
                <th>Order Items</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>
                    <span
                      className={
                        order.status === "pending"
                          ? "order-status-pending"
                          : "order-status-shipping"
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="order-address">{order.address}</td>
                  <td className="order-payment">{order.payment.code}</td>
                  <td>{order.payment.date}</td>
                  <td>
                    {order.payment.total.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="order-item">
                    {order.orderItems.map((item, index) => (
                      <ol start={1} key={item.id}>
                        <li>
                          {index + 1}. {item.book.title} - quantity x{" "}
                          {item.quantity} - Price: {item.price}
                        </li>
                      </ol>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (<SkeletonTheme baseColor="#fff" highlightColor="#f5f5f5">
          <div className="flex w-[1200px] m-auto">
            <div className="h-[930px] flex flex-row gap-2">
              <Skeleton count={1} width={70} height={400} />
              <Skeleton count={1} width={120} height={400} />
              <Skeleton count={1} width={200} height={400} />
              <Skeleton count={1} width={150} height={400} />
              <Skeleton count={1} width={150} height={400} />
              <Skeleton count={1} width={80} height={400} />
              <Skeleton count={1} width={430} height={400} />
            </div>
          </div>
        </SkeletonTheme>)}
      </OrderHistoryStyles>
    </Layout>
  );
};

export default OrderHistory;
