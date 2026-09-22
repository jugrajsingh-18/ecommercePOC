import { useSearchParams } from "react-router-dom";
import Category from "../components/Category";
import Products from "../components/Products";

export default function Home() {
    const [searchParams] = useSearchParams();
    const isSearching = !!searchParams.get("search");

    return (
        <div className="min-h-screen bg-background font-sans">
            {!isSearching && <Category/>}
            <Products/>
        </div>
    )
}
