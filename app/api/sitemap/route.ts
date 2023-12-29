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
//             url: `${PUBLIC_URL}`,
//             lastModified: new Date(),
//             changeFrequency: 'yearly',
//             priority: 1,
//         },
//         {
//             url: `${PUBLIC_URL}/about-us`,
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: `${PUBLIC_URL}/faq`,
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: `${PUBLIC_URL}/contact-us`,
//             lastModified: new Date(),
//             changeFrequency: 'monthly',
//             priority: 0.8,
//         },
//         {
//             url: `${PUBLIC_URL}/blog`,
//             lastModified: new Date(),
//             changeFrequency: 'weekly',
//             priority: 0.5,
//         },
//     ]

//     posts.forEach((post: any) => {
//         maps.push({
//             url: `${PUBLIC_URL}/${post.attributes.slug}`,
//             lastModified: new Date(),
//             changeFrequency: 'yearly',
//             priority: 1,
//         })
//     });

//     return NextResponse.json(maps)
// }
