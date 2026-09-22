import React, { useEffect, useState } from "react";
import { fetchCategory } from "../api/categoryApi";
import { Card, CardContent } from "./ui/card";
import type { CategoryType } from "../types/categoryTypes";
import { Link } from "react-router-dom";
import { checkInvalidImageOrNot, defaultImage } from "../api/product";
import CategorySkeleton from "./skeleton/CategorySkeleton";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function Category() {
  const setDefaultImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!e.currentTarget.src.includes(defaultImage)) {
      e.currentTarget.src = defaultImage;
    }
  };
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 8;
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetchCategory();
        if (response) {
          setCategory(response.data);
          setFetched(true);
        }
      } catch (error) {
        error;
      }
    };
    fetchCategoryData();
  }, []);
  return (
    <>
      {fetched ? (
        <div className="p-6">
          <div className="mb-6 flex-col flex my-10 justify-center items-center">
            <h1 className="text-3xl font-bold text-foreground">Shop by Category</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-center items-center ">
            {(!showAll ? category.slice(0, ITEMS_PER_PAGE) : category.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)).map((cat) => (
              <Link to={`/category/${cat.id}`} key={cat.id}>
                <Card
                  className="pt-0 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        cat.image && !checkInvalidImageOrNot(cat.image)
                          ? cat.image
                          : defaultImage
                      }
                      alt={cat.name}
                      className="w-full h-52 object-cover block group-hover:scale-110 transition-transform duration-500"
                      onError={setDefaultImg}
                    />
                  </div>

                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-foreground">{cat.name}</h2>
                    <p className="text-sm text-muted-foreground capitalize mt-1">
                      {cat.slug}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            {!showAll && category.length > ITEMS_PER_PAGE && (
              <Button onClick={() => setShowAll(true)} size="lg" variant="outline">
                See All Categories
              </Button>
            )}

            {showAll && Math.ceil(category.length / ITEMS_PER_PAGE) > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.ceil(category.length / ITEMS_PER_PAGE))].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(category.length / ITEMS_PER_PAGE), p + 1))}
                      className={currentPage === Math.ceil(category.length / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      ) : (
        //   <Spinner className="w-10 h-10" />
        // </div>
        <CategorySkeleton />
      )}
    </>
  );
}
