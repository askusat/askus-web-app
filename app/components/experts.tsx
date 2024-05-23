"use client";
import React, { useRef } from 'react';

interface Experts {
    id: number;
    heading: string;
    styled: React.CSSProperties | null;
    head1: string;
    paragraph: string;
    expertImg: string;
}

interface ExpertsProps {
    data: Experts[];
}

const Experts: React.FC<ExpertsProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -containerRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: containerRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <h2 className="font-PoppinsBold text-center xl:text-[48px]  lg:flex-[3] text-[36px] font-bold xl:leading-[58.09px] leading-[40px] p-[5rem] max-sm:p-[1rem] max-sm:pb-[2rem]">
                Meet Our Expert
            </h2>
            {/* max-sm:block hidden lg:block */}
            <div ref={containerRef} className='max-md:flex max-md:overflow-auto'>
                {/* {heading &&
                <h2 className="font-PoppinsBold text-center xl:text-[48px] hidden lg:block lg:flex-[3] text-[36px] font-bold xl:leading-[58.09px] leading-[40px] p-[5rem]">
                    {heading}
                </h2>
            } */}
                {/* <div className="max-sm:hidden left_sade bg-[url(/left-sade.png)]"></div>
            <div className="max-sm:hidden right_sade bg-[url(/right-sade.png)]"></div> */}
                {/* <section style={styled} className="flex max-sm:flex-wrap  justify-around items-center gap-6 w-full h-auto z-10 relative   px-[2%]">
                <div className=" lg:flex-row items-center justify-around w-[981px]] xl:leading-[66.15px] max-md:order-last max-md:text-center">
                    <h2 className="font-PoppinsBold xl:text-[60px] text-[36px] font-[900]  xl:leading-[66.15px] leading-[40px] md:text-[27px]">
                        {head1}
                    </h2>
                    <p className="xl:text-[18px] mt-[18px]  font-[400]  xl:leading-[33px] text-left  max-md:text-center">
                        {peragraph}
                    </p>
                </div>
                <div className=" md:flex-row items-center gap-8 ">
                    <div
                        style={{ backgroundImage: `url(${expertImg})` }}
                        className={`2xl:h-[614.15px] 2xl:w-[768px] xl:h-[400px]  md:h-[100%]  max-md:w-[280px] max-md:h-[280px] overflow-hidden  bg-contain bg-no-repeat bg-center flex-col items-center justify-center flex-start  rounded-[45.31px] transition-all md:rounded-[46px] w-[284px] h-[256.95px]`}
                    >
                    </div>
                </div>
            </section>  */}
                {data.map((expert) => (
                    <>
                        <div className="max-sm:hidden left_sade bg-[url(/left-sade.png)]"></div>
                        <div className="max-sm:hidden right_sade bg-[url(/right-sade.png)]"></div>
                        < section
                            key={expert.id}
                            style={expert.styled || undefined}
                            className="flex max-sm:flex-wrap justify-around items-center max-md:items-start gap-6 max-md:gap-0 w-full h-auto z-10 relative px-[2%]"
                        >
                            <div className=" lg:flex-row items-center justify-around w-[981px] xl:leading-[66.15px] max-md:order-last max-md:text-center">
                                <h2 className="font-PoppinsBold xl:text-[60px] text-[36px] max-md:text-[20px] font-[900]  xl:leading-[66.15px] leading-[40px] md:text-[27px]">
                                    {expert.head1}
                                </h2>
                                <p className="xl:text-[18px] mt-[18px] font-[400] max-md:mt-[0px] max-md:text-[14px] xl:leading-[33px] text-left max-md:text-center max-md:p-3 max-md:pt-0">
                                    {expert.paragraph}
                                </p>
                            </div>
                            <div className=" md:flex-row items-center gap-8 ">
                                <div
                                    style={{ backgroundImage: `url(${expert.expertImg})` }}
                                    className={`2xl:h-[500px] 2xl:w-[490px] xl:h-[400px]   
                                  max-md:w-[280px] max-md:h-[262px] overflow-hidden max-md:bg-cover max-md:rounded-[22px]  bg-contain bg-no-repeat bg-center flex-col items-center justify-center flex-start   rounded-[45.31px] transition-all  w-[284px] h-[256.95px]`}
                                ></div>
                            </div>
                        </section >
                    </>
                ))}
            </div>
            <div className="flex md:flex-col hidden max-md:flex mt-[18px] justify-center items-center gap-4">
                <div
                    className="bg-white max-sm:p-[12px] text-blue-500 shadow-md rounded-full md:w-[50px] md:h-[50px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-[#0580FE] hover:scale-105 hover:text-white ease-in duration-1000 transition-all"
                    onClick={scrollLeft}
                >
                    <p className="w-full  text-center text-[20px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    </p>
                </div>
                <div
                    className="bg-white max-sm:p-[12px] text-blue-500 shadow-md rounded-full md:w-[50px] md:h-[50px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-[#0580FE] hover:scale-105 hover:text-white ease-in duration-1000 transition-all"
                    onClick={scrollRight}
                >
                    <p className="w-full text-center text-[20px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Experts;