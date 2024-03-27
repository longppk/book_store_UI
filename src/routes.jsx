
import AdminSignUp from './page/Admin/AdminSignUp';
import AddNewAuthor from './page/Admin/Table/Author/AddNewAuthor';
import AuthorTable from './page/Admin/Table/Author/AuthorTable';
import EditAuthor from './page/Admin/Table/Author/EditAuthor';
import AddNewBook from './page/Admin/Table/Book/AddNewBook';
import BookTable from './page/Admin/Table/Book/BookTable';
import EditBook from './page/Admin/Table/Book/EditBook';
import AddGenre from './page/Admin/Table/Genre/AddGenre';
import EditGenre from './page/Admin/Table/Genre/EditGenre';
import GenreTable from './page/Admin/Table/Genre/GenreTable';
import AddVoucher from './page/Admin/Table/Voucher/AddVoucher';
import EditVoucher from './page/Admin/Table/Voucher/EditVoucher';
import VoucherTable from './page/Admin/Table/Voucher/VoucherTable';
import DashBoardAdmin from './page/Admin/dashboard';
import OrderTable from './page/Admin/order/orderTable';
import UpdateOrderStatus from './page/Admin/order/updateOrderStatus';
import Users from './page/Admin/users';

export const adminRoutes = [
    {
        layout: 'dashboard',
        pages: [
            {
                name: 'dashboard',
                path: '/dashboard',
                element: <DashBoardAdmin />,
            },
            {
                name: 'book_table',
                path: '/table/book',
                element: <BookTable />,
            },
            {
                name: 'add_book',
                path: '/table/book/add',
                element: <AddNewBook />,
            },
            {
                name: 'edit_book',
                path: '/table/book/edit/:bookId',
                element: <EditBook />,
            },
            {
                name: 'author_table',
                path: '/table/author',
                element: <AuthorTable />,
            },
            {
                name: 'add_author',
                path: '/table/author/add',
                element: <AddNewAuthor />,
            },
            {
                name: 'edit_author',
                path: '/table/author/edit/:authorId',
                element: <EditAuthor />,
            },
            {
                name: 'genre_table',
                path: '/table/genre',
                element: <GenreTable />,
            },
            {
                name: 'add_genre',
                path: '/table/genre/add',
                element: <AddGenre />,
            },
            {
                name: 'edit_genre',
                path: '/table/genre/edit/:genreId',
                element: <EditGenre />,
            },
            {
                name: 'voucher_table',
                path: '/table/voucher',
                element: <VoucherTable />,
            },
            {
                name: 'add_voucher',
                path: '/table/voucher/add',
                element: <AddVoucher />,
            },
            {
                name: 'edit_voucher',
                path: '/table/voucher/edit/:voucherId',
                element: <EditVoucher />,
            },
            {
                name: 'users',
                path: '/users',
                element: <Users />,
            },
            {
                name: 'order',
                path: '/order',
                element: <OrderTable />,
            },
            {
                name: 'update_status',
                path: '/order/edit/:orderId',
                element: <UpdateOrderStatus />,
            },
        ],
    },
];
