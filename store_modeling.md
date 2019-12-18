# Store Modeling

When creating a global app store it can be very tempting to want to store
everything in it for easy access, but I think it is worth the extra step to
transform data you retrieve from external sources (e.g., your API server) to a
more structured, and simplified, representation used by your app.

My belief is that the global app store should ostensibly by as shallow as
possible, but structured so that related pieces of data are grouped together for
organizational purposes (to help reasoning about the data). In this regard I
think it's good to have two main levels:

1. group/category level
2. data attribute level


## Groups/Categories

The first level is meant to simply be a set of "buckets" within which to place
actual data attributes. These act not only as categories for grouping related
pieces of data together, but also act as a segmentation line where (in the case
of Redux/useReducer) you can define clear boundaries between state reducers for
better modularization of the state-management code logic.

So, at the root, your app store might look something like this:

```
{
  auth: {},
  company: {},
  user: {},
  resource1: {},
  resource2: {},
  etc
}
```

Each of these root-level attributes would, then, have a corresponding reducer
module which would be in charge of managing the data attributes within those
categories. The higher level store module would then simply join all these
reducers together to form the overall application store object.


## Data Attributes

The second level would be the actual data attributes that are stored within each
category object. These are the real data values you want to persist throughout
the app, but flattened into a single list within each category "bucket".

It is important to normalize these data attributes to keep the store as simple
as possible. There will be some subjective judgement calls that need to be made
at this level, but the overall goal should be "as flat as possible".

For example, you might want to store an array, which contains elements which
are themselves objects (e.g., for a survey app, you might have an array of
questions, which are objects containing `name`, `id`, `date`,
etc.). It wouldn't make sense in this case to flatten this further, even though
this array would introduce a third level to the store. However, the goal should
be to think carefully about the data structure, and only include those
attributes that are necessary for the app, and not to include multiple nested
levels (e.g., maybe each question has another array of `responses` which are
also objects which have their own arrays of `users`...). This can get out of
hand very quickly, and the deeper the nesting, the more difficult it becomes to
reason about the data structure, and the more brittle the application code
becomes (changing the structure at one level will break multiple levels above
it).

So, I think the best course of action is to transform and format the incoming
data (e.g., don't just store the response from your API server as a raw object).
You should explicitly define each and every value that gets stored to not only
clarify *what* the data structure looks like, but also to enforce a predictable
structure that the rest of the application can depend upon. This way, if the API
server from which you're retrieving data changes *its* data structure, you have
a central location where you can adapt to that change without affecting any of
the application code itself.

For example, perhaps you have a `survey` category in your store which has an
array of `questions`. The response from your API server might be something like:

```
{
  questions: [
    {
      id: 1,
      name: 'What is your favorite color?',
      created_at: '2019-06-04 13:50:26',
      responses: [
        {
          user_id: 123,
          response: 'blue'
        },
        {
          user_id: 456,
          response: 'red'
        }
      ]
    },
    {
      id: 2,
      name: 'What city do you live in?',
      created_at: '2019-06-05 11:20:01',
      response: [
        {
          user_id: 123,
          response: 'Chicago'
        },
        {
          user_id: 456,
          response: 'Toronto'
        },
        {
          user_id: 789,
          response: 'New York'
        }
      ]
    }
  ]
}
```

You might want to transform this data into a format that your app needs, but
eliminate any unnecessary data, and flattening things out as much as possible
so that our store object loooks something like this:

```
{
  auth: {
    accessToken: 'a6d5f4g56ad1fg32asdf56a4sd65f4a56sd',
    refreshToken: 'as65d4f56a4sdf31asdf456asdf45a6sd',
    isAuthenticated: true
  },
  user: {
    id: 8273,
    name: 'Rob McLarty'
  },
  company: {
    id: 9283,
    name: 'My Company Ltd.'
  }
  survey: {
    id: 1234,
    name: 'My Amazing Survey',
    questions: [
      {
        id: 1,
        name: 'What is your favorite color?',
        date: '2019-06-04',
        totalResponses: 2
      },
      {
        id: 1,
        name: 'What city do you live in?',
        date: '2019-06-05',
        totalResponses: 3
      }
    ]
  }
}
```

In this case the question objects have been adjusted to the application's
requirements and stored in the `survey` category:

- `created_at` has been renamed to `date`
- the date value has been adjusted to only be the date, not including time
- individual response objects have been omitted
- a new `totalResponses` attribute has been introduced which is the length of
the `responses` array from the server (maybe the app only requires this number)

The point is, the incoming data does not dictate how the data is represented in
the app's store. There is a transformation/formatting step; a function where the
actual attribute names and structure get defined such that the app's own code
can depend on this predictable structure, regardless of the format of the
incoming data. This way, if the external dependency (the data source) is ever
changed, the concern of updating the application to enforce compatibility is
limited to a single module (this transformation function) without affecting the
rest of the application code in a significant way.

For example, perhaps in the future, the API server is changed and begins sending
its response like this:

```
{
  user: {
    id: 8273,
    name: 'Rob McLarty',
    surveys: [
      {
        id: 1234,  
        questions: [
          {
            question_id: 1,
            title: 'What is your favorite color?',
            created_at: '2019-06-04 13:50:26',
            response_ids: [123, 456]
          },
          {
            question_id: 2,
            title: 'What city do you live in?',
            created_at: '2019-06-05 11:20:01',
            respons_ids: [123, 456, 789]
          }
        ]
      }
    ]
  }
}
```

We could still transform this newly formatted object into our standardized
application store object by simply modifying our transform function. The app's
store attributes would remain exactly the same, and no code in the rest of the
app would need to be modified.
