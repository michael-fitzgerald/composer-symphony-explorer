export interface AssetFlyweight {
    Ticker : string,
    Name : string
    Price? : number,
    IsInvest : boolean,
    IsCompare : boolean,
    Details? : AssetDetails
}

export interface AssetDetails {
    Name : string,
    Category1 : string,
    Category2 : string,
    Category3 : string,
    Sector? : string,
    Industry? : string,
    LeverageRatio : number
}
