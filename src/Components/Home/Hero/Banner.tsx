"use client"
import { useState, useCallback, useEffect, PropsWithChildren } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

//Tenstack & Supabase
import { createClient } from "@/Supabase/client";
import { useQuery } from "@tanstack/react-query";
import { GET_BANNER_LIST } from "@/Tenstack/Functions/Home/banner";

const Banner = () => {
    //Supabase Client
    const supabase = createClient();

    //Initializing Embla
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay()
    ])

    //Query
    const { data } = useQuery({
        queryKey: ["bannerList"],
        queryFn: () => GET_BANNER_LIST(supabase)
    });

    //Dot Buttons API
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    return (
        <div className="overflow-hidden relative" ref={emblaRef}>
            <div className="flex">
                {data?.sort((a, b) => a.position - b.position).map((item, i) => (
                    <div key={i} className="flex-[0_0_100%] mr-2">
                        <div className="aspect-[2/1]">
                            <Image src={item.image} width={1800} height={900} alt={item.alt} className="w-full h-full" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
                {scrollSnaps.map((_, i) => (
                    <DotButton
                        key={i}
                        onClick={() => onDotButtonClick(i)}
                        className={`w-3 border border-solid border-main h-3 rounded-full  ${i === selectedIndex ? "bg-main" : "bg-white"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;


//Dot Buttons API
interface UseDotButtonType {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

const DotButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props
    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    )
}
