import { querySchema, QueryType } from '@offcourse/schema';
import { RESPONSE_TYPE } from '@offcourse/schema';
import { getUserRecords } from './models/userRecord';
import { getCourses } from './models/course';

export async function handleQuery(body: string) {
  const query = querySchema.parse(body);
  const { type, payload } = query;
  switch (type) {
    case QueryType.FETCH_USER_RECORDS: {
      const userRecords = await getUserRecords(payload);
      return {
        type: RESPONSE_TYPE.FETCHED_USER_RECORDS,
        payload: userRecords
      }
    }
    case QueryType.FETCH_USER_COURSES: {
      const courses = await getCourses();
      return {
        type: RESPONSE_TYPE.FETCHED_USER_COURSES,
        payload: courses
      }
    }
  }
}
