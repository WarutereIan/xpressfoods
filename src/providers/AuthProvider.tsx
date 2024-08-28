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
  phoneNumber: string;
  usernameSetter: (username: string) => void;
  profileSetter: (profile: any) => void;
  phoneNumberSetter: (phoneNumber: string) => void;
  refreshSession: () => void;
  clearSession: () => void;
  clearProfile: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  phoneNumber: "",
  userName: "",
  usernameSetter: (username: string) => {},
  profileSetter: (profile: any) => {},
  phoneNumberSetter: (phoneNumber: string) => {},
  refreshSession: () => {},
  clearSession: () => {},
  clearProfile: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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

      console.log(profile);
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

  const phoneNumberSetter = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const refreshSession = async () => {
    await fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  };

  const clearSession = () => {
    setSession(null);
  };
  const clearProfile = () => {
    setProfile(null);
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
        phoneNumber,
        phoneNumberSetter,
        clearSession,
        clearProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
