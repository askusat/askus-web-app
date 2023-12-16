import { NextResponse } from "next/server";
// import { fetchAPI } from '../../utils/fetch-api'

// export async function GET() {
//     const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
//     const path = `/articles`;
//     const urlParamsObject = {
//         sort: { id: "asc" },
//         populate: '*',
//         pagination: {
//             start: 0,
//             limit: 999999,
//         },
//     };
//     const options = { headers: { Authorization: `Bearer ${token}` } };
//     const res = await fetchAPI(path, urlParamsObject, options);

//     if (!res?.data) {
//         console.log("Failed to fetch data: => ", res.error.message);
//     }

//     const posts = res?.data

//     const maps = [
//         {
//             url: 'https://askus.vercel.app',
//             lastModified: new Date(),
//             changeFrequency: 'yearly',
//             priority: 1,
//         },
//         {
//             url: 'https://askus.vercel.app/about-us',
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: 'https://askus.vercel.app/faq',
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: 'https://askus.vercel.app/contact-us',
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: 'https://aaskus.vercel.app/blog',
//             lastModified: new Date(),
//             changeFrequency: 'weekly',
//             priority: 0.5,
//         },
//     ]

//     posts.forEach((post: any) => {
//         maps.push({
//             url: `https://askus.vercel.app/${post.attributes.slug}`,
//             lastModified: new Date(),
//             changeFrequency: 'yearly',
//             priority: 1,
//         })
//     });

//     return NextResponse.json(maps)
// }
