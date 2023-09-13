import Image from "next/image";


export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="flex justify-between gap-5" data-testid="products-list">
                <div>
                    <figure className="max-w-xs">
                        <Image
                            src="https://placehold.it/500x500"
                            alt="Web developer"
                            width={500}
                            height={500} />
                    </figure>
                    <caption>Bluza nowa</caption>
                    <caption>10PLN</caption>
                </div>
                <div>
                    <figure className="max-w-xs">
                        <Image
                            src="https://placehold.it/500x500"
                            alt="Web developer"
                            width={500}
                            height={500} />
                    </figure>
                    <caption>Spodnie stare</caption>
                    <caption>100PLN</caption>
                </div>
                <div>
                    <figure className="max-w-xs">
                        <Image
                            src="https://placehold.it/500x500"
                            alt="Web developer"
                            width={500}
                            height={500} />
                    </figure>
                    <caption>Spodnie stare</caption>
                    <caption>100PLN</caption>
                </div>
            </section>
        </main>
    );
}
