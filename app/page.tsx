import BookTransactionQuery from "@/components/BookTransactionQuery";
import UserBookHistory from "@/components/UserBookHistory";
import DateRangeBooks from "@/components/DateRangeBooks";

const Home = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl text-center font-bold mb-8">
                Book Rental System Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BookTransactionQuery />
                <UserBookHistory />
                <DateRangeBooks />
            </div>
        </div>
    );
};

export default Home;
