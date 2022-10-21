export interface SymphonyFlyweight {
    Id : string,
    Name : string,
    ParentId? : string,
    Parent? : SymphonyFlyweight,
    Children? : SymphonyFlyweight[]
}