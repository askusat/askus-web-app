export function formatDate(inputDate) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
    // const formattedTime = date.toLocaleTimeString('en-US', options);

    // return `${formattedDate} - ${formattedTime}`;
    return `${formattedDate}`;
}

export function getDirection(locale) {
    return locale === 'ar' ? 'rtl' : 'ltr';
}