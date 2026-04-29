import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductType } from "@/types/Product.type";
import ProductCard from "./ProductCard";

export function CarouselSpacing({
  youMayLikeProducts,
}: {
  youMayLikeProducts: ProductType[] | null;
}) {
  return (
    <Carousel className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className=""></span>
        <div className="flex items-center gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="-ml-1">
        {youMayLikeProducts?.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 pl-1 md:basis-1/4 lg:basis-1/5"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
