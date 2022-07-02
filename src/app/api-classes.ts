
    export interface Photo {
        id: string;
        owner: string;
        secret: string;
        server: string;
        farm: number;
        title: string;
        ispublic: number;
        isfriend: number;
        isfamily: number;
        safe: number;
    }

    export interface PhotoResponse
    {
        page: number;
        pages: number;
        perpage: number;
        total: number;
        photo: Photo[];
        max_allowed_results: number;
        max_allowed_pages: number;
    }

    export interface PhotoResponseRoot
    {
        photos: PhotoResponse;
        stat: string;
    }
