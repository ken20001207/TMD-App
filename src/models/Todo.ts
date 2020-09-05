export default interface Todo {
    id: string;
    title: string;
    status: "ONE_DAY_LEFT" | "ONE_WEEK_LEFT" | "MORE_THAN_ONE_WEEK_LEFT" | "EXPIRED";
    ddl: string;
}
