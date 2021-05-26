export type CardType = {
    id: number;
    name: string;
    body: string;
    categoryID: number;
};

export type BoardType = {
    id: number;
    name: string;
    numCategories: number;
};

export type CategoryType = {
    id: number;
    name: string;
    boardID: number;
};
