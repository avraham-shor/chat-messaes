package ravtech.avrahamShor.chat;

public class מענטש {
    String נאמען;

    private מענטש() {
    }

    public static מענטש גיב_די_אינסטאנס() {
       מענטש איש  = new מענטש();
        return איש;
    }

    public void בייט_די_נאמען(String נאמען) {
        this.נאמען = נאמען;
    }

    public void דרוק() {
        System.out.println(this.נאמען);
    }

    @Override
    public String toString() {
        return "מענטש{" +
                "נאמען='" + נאמען + '\'' +
                '}';
    }
}
