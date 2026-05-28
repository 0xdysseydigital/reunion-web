import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Reunion Content")
    .items([
      S.listItem()
        .title("Menu Items")
        .icon(() => "🍽️")
        .child(
          S.list()
            .title("Menu Items")
            .items([
              S.listItem()
                .title("Brunch")
                .child(
                  S.documentList()
                    .title("Brunch Items")
                    .filter('_type == "menuItem" && menu_type == "brunch"')
                    .defaultOrdering([{ field: "section", direction: "asc" }])
                ),
              S.listItem()
                .title("Lunch")
                .child(
                  S.documentList()
                    .title("Lunch Items")
                    .filter('_type == "menuItem" && menu_type == "lunch"')
                    .defaultOrdering([{ field: "section", direction: "asc" }])
                ),
              S.listItem()
                .title("Dinner")
                .child(
                  S.documentList()
                    .title("Dinner Items")
                    .filter('_type == "menuItem" && menu_type == "dinner"')
                    .defaultOrdering([{ field: "section", direction: "asc" }])
                ),
              S.listItem()
                .title("Bar")
                .child(
                  S.documentList()
                    .title("Bar Items")
                    .filter('_type == "menuItem" && menu_type == "bar"')
                    .defaultOrdering([{ field: "section", direction: "asc" }])
                ),
              S.divider(),
              S.listItem()
                .title("All Items")
                .child(
                  S.documentList()
                    .title("All Menu Items")
                    .filter('_type == "menuItem"')
                    .defaultOrdering([{ field: "menu_type", direction: "asc" }, { field: "section", direction: "asc" }])
                ),
            ])
        ),
      S.listItem()
        .title("Events")
        .icon(() => "📅")
        .child(
          S.list()
            .title("Events")
            .items([
              S.listItem()
                .title("Upcoming")
                .child(
                  S.documentList()
                    .title("Upcoming Events")
                    .filter('_type == "event" && date >= now()')
                    .defaultOrdering([{ field: "date", direction: "asc" }])
                ),
              S.listItem()
                .title("Past")
                .child(
                  S.documentList()
                    .title("Past Events")
                    .filter('_type == "event" && date < now()')
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
              S.divider(),
              S.listItem()
                .title("All Events")
                .child(
                  S.documentList()
                    .title("All Events")
                    .filter('_type == "event"')
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
            ])
        ),
    ]);
