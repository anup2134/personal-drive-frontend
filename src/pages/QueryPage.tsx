// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp } from "lucide-react";
import { queryFile } from "@/apis/strorageApis";

function Text({ isQuestion, text }: { isQuestion?: boolean; text: string }) {
  return (
    <div className={isQuestion ? "w-4/5 self-end" : ""}>
      <Label className="ml-2">
        {text === "" ? "Answering..." : isQuestion ? "Question:" : "Answer:"}
      </Label>
      {text === "" ? (
        <div className="space-y-2 border border-gray-200 rounded-2xl w-content p-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      ) : (
        <p className="border border-gray-200 rounded-2xl w-content p-2">
          {text}
        </p>
      )}
    </div>
  );
}

function Dialog({
  questionText,
  answerText,
}: {
  questionText: string;
  answerText: string;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Text isQuestion text={questionText} />
      <Text text={answerText} />
    </div>
  );
}

export default function QueryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ answer: string; question: string }[]>([]);
  const [answering, setAnswering] = useState(false);

  const state = location.state as {
    name: string;
    url: string;
    id: number;
  };
  useEffect(() => {
    if (!state) navigate("/");
    if (!state.url) navigate("/");
    if (!state.id) navigate("/");
  }, [state]);

  async function handleQuery() {
    setAnswering(true);
    setChat([...chat, { question: question, answer: "" }]);
    const ans = await queryFile(state.id, question).catch(() => {
      return undefined;
    });
    setQuestion("");
    setChat((prevChat) => {
      const obj = prevChat[prevChat.length - 1];
      prevChat.pop();
      const newChat = [...prevChat];
      obj.answer = ans ?? "Unable to answer at this moment.";
      newChat.push(obj);
      return newChat;
    });
    setAnswering(false);
  }

  return (
    <main className="w-screen h-screen flex sm:flex-row flex-col">
      <iframe
        src={state ? state.url : ""}
        className="w-full md:w-1/2 lg:w-3/5 xl:w-3/4 h-full"
      />
      <section className="md:w-1/2 lg:w-2/5 xl:w-1/4 h-full px-2 flex-col w-full flex">
        <Textarea
          className="mt-5 w-full overflow-auto resize-none h-20 rounded-2xl pb-8"
          placeholder="Ask a question."
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <button
          className="relative hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={handleQuery}
          disabled={answering || question === ""}
        >
          <ArrowUp
            size={25}
            className="border rounded-full p-1 bg-gray-300 absolute right-4 -top-8"
          />
        </button>

        <div className="w-full mt-4">
          {chat.map((c, i) => (
            <Dialog key={i} answerText={c.answer} questionText={c.question} />
          ))}
        </div>
      </section>
    </main>
  );
}
