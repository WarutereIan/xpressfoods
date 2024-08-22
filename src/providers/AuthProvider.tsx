import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
  userName: string;
  usernameSetter: (username: string) => void;
  profileSetter: (profile: string) => void;
  refreshSession: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  userName: "",
  usernameSetter: (username: string) => {},
  profileSetter: (profile: string) => {},
  refreshSession: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      // fetch profile
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      setProfile(data || null);

      data.group == "ADMIN" ? setIsAdmin(true) : setIsAdmin(false);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const usernameSetter = (username: string) => {
    setUserName(username);
  };

  const profileSetter = (profile: any) => {
    setProfile(profile);
  };

  const refreshSession = async () => {
    await fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
        userName,
        usernameSetter,
        refreshSession,
        profileSetter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
