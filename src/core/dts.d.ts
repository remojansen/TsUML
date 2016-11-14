declare module "nomnoml" {

    interface nomnoml {
        renderSvg(umlString: string): string;
    }

    module nomnoml {}

    var nomnoml: nomnoml;
    export = nomnoml;

}