//UI
import { Container } from "../Ui";

//Components
import ProductBread from "./ProductContent/ProductBread";
import ProductImage from "./ProductContent/ProductImage";
import ProductInfo from "./ProductContent/ProductInfo";
import BestSelling from "./ProductContent/BestSelling";

const ProductContent = () => {
    return (
        <section className="mt-28 mb-14">
            <Container className="!px-32 3xl:!px-32 xl:!px-10 msm:!px-5 xxs:!px-4">
                <ProductBread />
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-7 xl:col-span-7 xxs:col-span-12">
                        <ProductImage />
                    </div>
                    <div className="col-span-5 xl:col-span-5 xxs:col-span-12">
                        <ProductInfo />
                    </div>
                </div>
                <BestSelling />
            </Container>
        </section>
    );
};

export default ProductContent;