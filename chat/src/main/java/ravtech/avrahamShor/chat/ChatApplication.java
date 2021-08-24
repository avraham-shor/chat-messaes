package ravtech.avrahamShor.chat;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@SpringBootApplication
public class ChatApplication {

    public static void main(String[] args) {
		SpringApplication.run(ChatApplication.class, args);
//        runCodWarsFunctions();
    }























































































    public static Map<String, Integer> setWordsAndCount(String text) {
        Map<String, Integer> sw = new HashMap<>();
        for (String word : text.split(" ")) {
            if (!sw.containsKey(word)) sw.put(word, 1);
            else sw.put(word, sw.get(word) + 1);
        }
        return sw;
    }

    public static String setWords(String text) {
        Set<String> stringSet = new HashSet<>(Arrays.asList(text.split(" ")));
        List<String> mainList = new ArrayList<>();
        mainList.addAll(stringSet);
        return String.join(" ", mainList);

    }

    public static int findIt(int[] a) {
        Arrays.sort(a);
        int odd = 0;
        int mul = -1;
        for (int n: a) {
            odd += n * (mul *= -1);
        }
        return odd;
    }

    public static int duplicateCount(String text) {

        long timeMilli2 = Calendar.getInstance().getTimeInMillis();
        int count = 0;
        String _text = text.toLowerCase();
        for (String c : _text.split("")) {
            if (_text.length() - _text.replaceAll(c, "").length() > 1) {
                count++;
                _text = _text.replaceAll(c, "");
            }
        }
        System.out.println(Calendar.getInstance().getTimeInMillis() - timeMilli2);
        return count;
    }


    public static int solution(int number) {
        long timeMilli2 = Calendar.getInstance().getTimeInMillis();
        int count = 0;
        number -= 1;
        while (number > 1) {
            if (number % 3 == 0 || number % 5 == 0) count += number;
            number -= 1;
        }
        System.out.println(Calendar.getInstance().getTimeInMillis() - timeMilli2);
        return count;
    }




	private static void runCodWarsFunctions() {
		System.out.println(findIt(new int[]{20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5}));
		System.out.println(findIt(new int[]{1,1,2,-2,5,2,4,4,-1,-2,5}));
		System.out.println(findIt(new int[]{20,1,1,2,2,3,3,5,5,4,20,4,5}));
		System.out.println(findIt(new int[]{10}));
//		System.out.println(duplicateCount("indivisibility"));
//		findIt(new int[]{1,3,1,3,7,4,4,5,6,5,6,7,7});
//		System.out.println(solution(10));
//		Mixing.mix("Are they here", "yes, they are here");
//		Mixing.mix("looping is fun but dangerous", "less dangerous than coding");
//		Mixing.mix("codewars", "codewars");
	}
}



//https://www.codewars.com/kata/5629db57620258aa9d000014/train/java
class Mixing {
	public static String mix(String s1, String s2) {
		Set<String> sums = new HashSet<>();
		s1 = s1.replaceAll("[^a-z]", "");
		s2 = s2.replaceAll("[^a-z]", "");
		for (String c : (s1 + s2).split("")) {
			String str1 = s1.replaceAll("[^" + c + "]", "");
			String str2 = s2.replaceAll("[^" + c + "]", "");
			if (Math.max(str1.length(), str2.length()) < 2) continue;
			if (str1.length() > str2.length()) sums.add("1" + str1);
			if (str1.length() < str2.length()) sums.add("2" + str2);
			if (str1.length() == str2.length()) sums.add("=" + str1);
		}
		ArrayList<String> sum = new ArrayList<>(sums);
		sum.sort((o1, o2) -> {
            if (o1.length() == o2.length()) return o1.compareTo(o2);
            return o2.length() - o1.length();
        });
		StringBuilder sb = new StringBuilder();
        sum.stream().map(i -> i.substring(0, 1) + ':' + i.substring(1) + '/').forEach(sb::append);
		if (sb.length() < 1) return "";
		return sb.substring(0, sb.length() - 1);
	}
}
