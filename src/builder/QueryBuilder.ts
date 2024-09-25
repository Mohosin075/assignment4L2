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
    const queryObj = {...this.query}
    const exCludeFields = ['sortBy'];

    exCludeFields.forEach(el=>delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  };


  sort(){
    const sort =  (this?.query?.sortBy || '-price') as string
    console.log(sort);
    this.modelQuery = this.modelQuery.sort(sort)
    return this
  }
}

export default QueryBuilder;
