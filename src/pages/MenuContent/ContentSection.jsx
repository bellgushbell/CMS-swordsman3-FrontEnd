// ปรับรูปได้ตามขนาดที่ต้องการ
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Chip, useTheme } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  Bold,
  Essentials,
  Heading,
  ImageBlock,
  ImageResize,
  ImageInline,
  ImageStyle,
  ImageInsert,
  ImageInsertViaUrl,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  FontColor,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "../../../src/App.css";

const LICENSE_KEY = "GPL";

const resizeImage = (file, width, height) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        }, "image/jpeg");
      };
    };
  });
};

class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  async upload() {
    const file = await this.loader.file;
    const resizedFile = await resizeImage(file, 800, 300);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", resizedFile);
      fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          resolve({ default: result.url });
        })
        .catch(reject);
    });
  }
}

const ContentSection = ({ data, setData }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "alignment",
            "fontColor",
            "link",
            "insertImage",
            "mediaEmbed",
            "insertTable",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoImage,
          Autosave,
          Base64UploadAdapter,
          Bold,
          Essentials,
          Heading,
          ImageBlock,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageResize,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline,
          FontColor,
        ],
        image: {
          toolbar: [
            "imageTextAlternative",
            // "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "resizeImage",
          ],
          styles: ["alignLeft", "alignCenter", "alignRight"],

          resizeUnit: "px",
          resizeOptions: [
            {
              name: "resizeImage:original",
              value: null,
              label: "Original",
            },
            {
              name: "resizeImage:25",
              value: "25",
              label: "25%",
            },
            {
              name: "resizeImage:50",
              value: "50",
              label: "50%",
            },
            {
              name: "resizeImage:75",
              value: "75",
              label: "75%",
            },
            {
              name: "resizeImage:custom",
              value: "custom",
              label: "Custom",
            },
          ],
          upload: {
            maxFileSize: 2 * 1024 * 1024,
            types: ["jpeg", "png", "gif", "bmp", "webp"],
          },
          defaultStyle: "alignCenter",
        },
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        fontColor: {
          colors: [
            { color: "black", label: "Black" },
            { color: "red", label: "Red" },
            { color: "blue", label: "Blue" },
            { color: "green", label: "Green" },
            { color: "orange", label: "Orange" },
          ],
          columns: 5,
        },

        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <>
      <Divider>
        <Chip
          label={t("create_content")}
          size="large"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            marginBottom: "10px",
            marginTop: "10px",
          }}
        />
      </Divider>

      {/* CKEditor */}

      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
        style={{
          maxHeight: isOpen ? "800px" : "0",
          transition: "max-height 0.5s ease-out",
          overflow: "hidden",
        }}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={data?.content}
                onChange={(event, editor) =>
                  setData((prevData) => ({
                    ...prevData,
                    content: editor.getData(),
                  }))
                }
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Content */}

      <Divider>
        <Chip
          label={t("preview_content")}
          size="large"
          onClick={() => setIsOpenPreview(!isOpenPreview)}
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            marginBottom: "10px",
            marginTop: "10px",
          }}
        />
      </Divider>

      <div
        className="mt-6"
        style={{
          maxHeight: !isOpenPreview ? "800px" : "0",
          transition: "max-height 0.5s ease-out",
          overflow: "hidden",
        }}
      >
        {/* <Divider sx={{ marginY: "10px" }}>
          <Chip label={t("preview_content")} />
        </Divider> */}
        <div
          className="prose max-w-none mt-4 ck-content"
          dangerouslySetInnerHTML={{ __html: data?.content }}
          style={{
            border: "2px solid #ccc",
          }}
        />
      </div>
    </>
  );
};

export default ContentSection;
