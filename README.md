# Supabase CheatSheet

## Create web-push table

```
create table web_push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  expiration_time timestamp with time zone
);
```

## Check Auth

```
useEffect(() => {
    let mounted = true;
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (mounted) setIsAuthenticated(!!user);
      })
      .catch((err) => console.error("Error fetching user:", err));
    return () => {
      mounted = false;
    };
  }, [supabase]);
```

## Sign-In

```
const onSubmit = async (data: SignInForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(`${error.message}.`);
      return;
    }

    router.refresh();
    router.push("/dashboard");
    toast.success("Successfully signed in!");
  };
```

## Sign-Up

```
const onSubmit = async (data: SignUpForm) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error(
          <span>
            {error.message}!
            <br />
            Please sign in instead.
          </span>,
          {
            action: {
              label: "Sign In",
              onClick: () => router.push("/sign-in"),
            },
          },
        );
      } else {
        toast.error(`${error.message}.`);
      }
      return;
    }

    toast.success(
      <span>
        Successfully signed up!
        <br />
        You will now be automatically signed in.
      </span>,
    );
    router.push("/dashboard");
  };
```

## Sign-Out

```
const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`${error.message}.`);
      return;
    }
    router.refresh();
    router.push("/");
    toast.success("Successfully signed out!");
  };
```

## Get User

```
useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser().catch((err) => console.error("Error fetching user:", err));
  }, [supabase.auth]);
```

## Fetch from table "Courses"

```
useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("featured", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }

      setCourses(data || []);
      setLoading(false);
    };

    fetchCourses().catch((err) => {
      console.error("Error fetching courses:", err);
    });
  }, [supabase]);
```
