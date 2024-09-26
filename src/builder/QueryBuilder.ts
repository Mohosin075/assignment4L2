import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    (this.modelQuery = modelQuery), (this.query = this.transformQuery(query));
  }

  private transformQuery(
    query: Record<string, unknown>
  ): Record<string, unknown> {
    const queryMapping: Record<string, string> = {
      level: "details.level",
      tag: "tags.name",
    };

    const transformedQuery: Record<string, unknown> = {};

    for (const key in query) {
      if (queryMapping[key]) {
        transformedQuery[queryMapping[key]] = query[key];
      } else {
        transformedQuery[key] = query[key];
      }
    }

    return transformedQuery;
  }

  filter() {
    const queryObj = { ...this.query };
    const exCludeFields = ["sortBy", "sortOrder", "startDate", "endDate", "limit", "page"];

    exCludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortAbleField = [
      "title",
      "price",
      "startDate",
      "endDate",
      "language",
      "durationInWeeks",
    ];

    const sort = (
      sortAbleField.includes(this?.query?.sortBy as string)
        ? this?.query?.sortBy
        : "price"
    ) as string;
    const sortOrder = this?.query?.sortOrder === "asc" ? "" : "-";

    const sortField = `${sortOrder}${sort}`;

    this.modelQuery = this.modelQuery.sort(sortField);

    return this;
  }

  paginate() {

    const limit = (this.query.limit || 10) as number;
    const page = (this.query.page || 1) as number;

    
    const skip = (page - 1) * limit

    console.log(skip);

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }
}

export default QueryBuilder;
