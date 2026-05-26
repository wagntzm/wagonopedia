function MainSection()
{
    return(
        <div className="relative w-64 h-64 ml-80 mr-auto mt-auto mb-auto ">

            <div className="absolute top-0 left-0 w-120 h-120 bg-neutral-700 rounded-md">
                <input


                ></input>
            </div>

            <div className="absolute top-45 left-100 w-160 h-70 bg-neutral-500 rounded-md">

            </div>


        </div>
    )
}

export default function Home() {
    return (
        <main className="items-center">
            <div className="h-100 flex w-full">
                <MainSection>

                </MainSection>
            </div>
        </main>



    );
}