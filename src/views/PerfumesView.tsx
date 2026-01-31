import React, { useEffect } from 'react';
import { products } from '../data/products';
import { perfumeCategories } from '../data/categoryMapping';
import { ContactView } from './ContactView';
import { CartoucheCard } from '../components/CartoucheCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';

// Product interface shared with CartoucheCard
import type { Product } from '../data/products';

interface PerfumesViewProps {
    onAddToCart?: (product: Product, size: string, price: number, buyNow?: boolean) => void;
    initialSection?: string;
}

export const PerfumesView: React.FC<PerfumesViewProps> = ({ onAddToCart, initialSection }) => {
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    useEffect(() => {
        if (initialSection) {
            const element = document.getElementById(initialSection);
            if (element) {
                // Small delay to ensure rendering complete
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [initialSection]);

    return (
        <div className="pt-24 pb-20 container mx-auto px-4">
            {perfumeCategories.map((category) => {
                const categoryProducts = products.filter(p => category.originalCollectionIds.includes(p.collection));

                return (
                    <section key={category.id} id={category.id} className="mb-24 scroll-mt-28">
                        <div className="text-center mb-12">
                            <h2 className="text-[#FFD700] text-3xl font-serif uppercase mb-2">
                                {category.titleEn}
                            </h2>
                            {category.titleAr && <p className="text-[#D4AF37] text-xl font-serif">{category.titleAr}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryProducts.map((product) => (
                                <CartoucheCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart || (() => { })}
                                    onViewDetails={(p) => setSelectedProduct(p)}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}

            <ProductDetailsModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Footer Contact Section */}
            <div className="mt-20 border-t border-[#D4AF37]/20 pt-10">
                <ContactView />
            </div>
        </div>
    );
};
