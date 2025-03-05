const apiKey = "YOUR_API_KEY"

interface Address {
    address: string;
    building_name: string;
    building_number: string;
    delivery_point_suffix: string;
    department_name: string;
    dependant_locality: string;
    dependant_thoroughfare: string;
    double_dependant_locality: string;
    line_1: string;
    line_2: string;
    line_3: string;
    organisation_name: string;
    po_box: string;
    post_town: string;
    postcode: string;
    postcode_compact: string;
    postcode_incode: string;
    postcode_outcode: string;
    postcode_type: string;
    premise: string;
    su_organisation_indicator: string;
    sub_building_name: string;
    thoroughfare: string;
    udprn: string;
}

interface Geocode {
    eastings: string;
    northings: string;
    latitude: string; // Fixed spelling
    longitude: string;
}

interface PostalCodesResult {
    addresses: Address[];
    country: string;
    county: string;
    district: string;
    geocode: Geocode;
    postcode: string;
    ward: string;
}

interface PostalCodesResponse {
    status: number;
    message: string;
    noOfItems: number;
    result: PostalCodesResult;
}

// const API_KEY = process.env.POSTCODE_API_KEY || "YOUR_DEFAULT_API_KEY";
const API_KEY = apiKey;

const searchPostalCodeOnline = async (postalCode: string): Promise<{ data: PostalCodesResponse; status: number }> => {
    const res = await fetch(`https://postcode.apitier.com/v1/postcodes/${postalCode}?x-api-key=${API_KEY}`);
    return { data: await res.json(), status: res.status };
};

const getStoredPostalCodes = (): Address[] => {
    try {
        const addresses = localStorage.getItem("postalCodes");
        return addresses ? JSON.parse(addresses) : [];
    } catch (error) {
        console.error("Failed to parse stored postal codes:", error);
        return [];
    }
};

const searchPostalCodeOffline = (postalCode: string): Address[] => {
    const localAddresses = getStoredPostalCodes();
    return localAddresses.filter((address) => address?.postcode?.toUpperCase()?.includes(postalCode?.toUpperCase()));
};

const savePostalCodeOffline = (incomingAddresses: Address[]) => {
    const localAddresses = getStoredPostalCodes();
    localStorage.setItem("postalCodes", JSON.stringify([...localAddresses, ...incomingAddresses]));
};

export const searchPostalCodeGlobal = async (postalCode: string): Promise<Address[]> => {
    const localRes = searchPostalCodeOffline(postalCode);
    if (localRes.length !== 0) {
        return localRes;
    }

    const { data, status } = await searchPostalCodeOnline(postalCode);
    if (status === 200 && data?.result?.addresses) {
        const addresses = data.result.addresses;
        savePostalCodeOffline(addresses);
        return addresses;
    }

    return [];
};

