
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





    export interface Gift {
        gift_eligible: boolean;
        eligible_durations: string[];
        new_flow: boolean;
    }

    export interface Owner {
        nsid: string;
        username: string;
        realname: string;
        location: string;
        iconserver: string;
        iconfarm: number;
        path_alias: string;
        noindexfollow: number;
        ispro: number;
        pro_badge: string;
        is_ad_free: number;
        gift: Gift;
    }

    export interface Title {
        _content: string;
    }

    export interface Description {
        _content: string;
    }

    export interface Visibility {
        ispublic: number;
        isfriend: number;
        isfamily: number;
        safety_level: string;
        content_type: string;
        hidden: number;
        moderation_mode: string;
    }

    export interface Dates {
        posted: string;
        posted_str?: string;
        taken: string;
        takengranularity: number;
        takenunknown: string;
        lastupdate: string;
    }

    export interface Editability {
        cancomment: number;
        canaddmeta: number;
    }

    export interface Publiceditability {
        cancomment: number;
        canaddmeta: number;
    }

    export interface Usage {
        candownload: number;
        canblog: number;
        canprint: number;
        canshare: number;
    }

    export interface Comments {
        _content: string;
    }

    export interface Notes {
        note: any[];
    }

    export interface People {
        haspeople: number;
    }

    export interface Tag {
        id: string;
        author: string;
        authorname: string;
        raw: string;
        _content: string;
        author_name: string;
        machine_tag: boolean;
    }

    export interface Tags {
        tag: Tag[];
    }

    export interface Url {
        type: string;
        _content: string;
    }

    export interface Urls {
        url: Url[];
    }

    export interface PhotoDetailed {
        id: string;
        secret: string;
        server: string;
        farm: number;
        dateuploaded: string;
        isfavorite: number;
        license: string;
        safety_level: string;
        rotation: number;
        originalsecret: string;
        originalformat: string;
        owner: Owner;
        title: Title;
        description: Description;
        visibility: Visibility;
        dates: Dates;
        views: string;
        editability: Editability;
        publiceditability: Publiceditability;
        usage: Usage;
        comments: Comments;
        notes: Notes;
        people: People;
        tags: Tags;
        urls: Urls;
        safe: number;
        pending: number;
        media: string;
    }

    export interface InfoResponseRoot
    {
        photo: PhotoDetailed;
        stat: string;
    }
