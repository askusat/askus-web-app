import { cache } from 'react'
import { fetchAPI } from './fetch-api';

export const revalidate = 3600 // revalidate the data at most every hour

export const getPost = cache(async (slug, locale) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: '*',
        locale: [locale],
        // publicationState: 'live',
        // sort: { createdAt: "desc" },
        // populate: {
        //     cover: { fields: ["url"] },
        //     // category: { populate: "*" },
        //     // authorsBio: {
        //     //     populate: "*",
        //     // },
        // },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const res = await fetchAPI(path, urlParamsObject, options);

    if (!res?.data) {
        console.log("Failed to fetch data: => ", res.error.message);
    }

    // console.log("slug: ", res?.data);
    return res?.data?.[0]
})