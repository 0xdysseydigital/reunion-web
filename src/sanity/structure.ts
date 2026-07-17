import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Reunion Content")
    .items([
      orderableDocumentListDeskItem({
        type: "menuSection",
        title: "Menu Sections (drag to reorder)",
        icon: () => "↕️",
        S,
        context,
      }),

      S.listItem()
        .title("Menu Items by Section")
        .icon(() => "🍽️")
        .child(
          S.documentTypeList("menuSection")
            .title("Choose a Section")
            .child((sectionId) =>
              // orderableDocumentListDeskItem() returns an already-resolved ListItem;
              // its `.child` is the ordered document-list pane itself. Cast needed —
              // the plugin's types and sanity/structure's ChildResolver types don't
              // line up exactly even though this is the documented nesting pattern.
              (orderableDocumentListDeskItem({
                type: "menuItem",
                title: "Items in this Section",
                filter: "section._ref == $sectionId",
                params: { sectionId },
                S,
                context,
              }).child as unknown) as ReturnType<typeof S.documentList>
            )
        ),

      S.divider(),

      S.listItem()
        .title("Browse Menu Items")
        .icon(() => "📋")
        .child(
          S.list()
            .title("Browse Menu Items")
            .items([
              S.listItem()
                .title("Brunch")
                .child(
                  S.documentList()
                    .title("Brunch Items")
                    .filter('_type == "menuItem" && "brunch" in menu_type')
                ),
              S.listItem()
                .title("Lunch")
                .child(
                  S.documentList()
                    .title("Lunch Items")
                    .filter('_type == "menuItem" && "lunch" in menu_type')
                ),
              S.listItem()
                .title("Dinner")
                .child(
                  S.documentList()
                    .title("Dinner Items")
                    .filter('_type == "menuItem" && "dinner" in menu_type')
                ),
              S.listItem()
                .title("Bar")
                .child(
                  S.documentList()
                    .title("Bar Items")
                    .filter('_type == "menuItem" && "bar" in menu_type')
                ),
              S.divider(),
              S.listItem()
                .title("All Items")
                .child(
                  S.documentList()
                    .title("All Menu Items")
                    .filter('_type == "menuItem"')
                ),
            ])
        ),

      S.divider(),

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

      S.divider(),

      S.listItem()
        .title("Site Images")
        .icon(() => "🖼️")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
